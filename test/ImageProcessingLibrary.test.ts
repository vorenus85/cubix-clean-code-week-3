import { ImageProcessingLibrary } from "../src/ImageProcessingLibrary"

describe('ImageProcessingLibrary:', ()=>{

    let imageProcessingLibrary: ImageProcessingLibrary

    beforeEach(()=>{
        imageProcessingLibrary = new ImageProcessingLibrary();
    })

    it('it should process the content of image and returns a string', async ()=>{
        // Arrange
        const image = 'sample.png';

        // Act + Assert
        const actualResult = async () => await imageProcessingLibrary.processImage(image);
        
        await expect(actualResult()).resolves.not.toThrow();
    })
})