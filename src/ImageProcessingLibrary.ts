export class ImageProcessingLibrary{

    public async processImage(image: string) : Promise<string> {
        const processImagePromise =  new Promise((resolve) => setTimeout(resolve, 500));

        return processImagePromise
            .then(()=>{ return 'content of processed image...'})
            .catch((error)=>{
            throw new Error(error);
        })
    }
}