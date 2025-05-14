// import axios from 'axios';
// import { REPLICATE_API_TOKEN, FACE_SWAP_MODEL } from '../config/api';
const WORKER_URL = 'https://swap-face-api.hebei5920.workers.dev/';

const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result as string;
            // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = base64String.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
};

export const swapFaceApi = async (
    sourceImage: File,
    targetImage: File,
    onProgress?: (progress: number) => void
): Promise<string> => {
    try {
        // 检查是否上传了两张图片
        if (!sourceImage || !targetImage) {
            throw new Error('请上传两张图片：sourceImage和targetImage');
        }

        // 检查文件类型
        if (!(sourceImage instanceof File) || !(targetImage instanceof File)) {
            throw new Error('无效的文件对象，请确保上传的是图片文件');
        }

        // 检查文件类型是否为图片
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validImageTypes.includes(sourceImage.type) || !validImageTypes.includes(targetImage.type)) {
            throw new Error('请上传有效的图片文件（支持 JPG、PNG、GIF、WebP 格式）');
        }

        // 转换图片为base64
        const [sourceImageBase64, targetImageBase64] = await Promise.all([
            convertFileToBase64(sourceImage),
            convertFileToBase64(targetImage)
        ]);

        console.log("调用Replicate API...");
        const requestData = {
            swap_image: 'data:application/octet-stream' + sourceImageBase64,
            input_image: 'data:application/octet-stream' + targetImageBase64
        }

        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        console.log('API response:', data);

        if (onProgress) {
            onProgress(100); // 完成时显示100%进度
        }

        if (data.urls && data.urls.stream) {
            return data.urls.stream;
        } else {
            throw new Error("Failed to get result URL. Please try again.");
        }

    } catch (error) {
        console.error("Error in face swap:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Failed to swap faces. Please try again.");
    }
};
