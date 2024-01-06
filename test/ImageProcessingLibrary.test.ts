import { ImageProcessingLibrary } from "../src/ImageProcessingLibrary"
import { CONTENT_OF_PROCESSED_IMAGE } from "../src/constants";

describe('ImageProcessingLibrary', ()=>{

    let imageProcessingLibrary: ImageProcessingLibrary

    beforeEach(()=>{
        imageProcessingLibrary = new ImageProcessingLibrary();
    })
    
    describe('Happy path', ()=>{
        it('should process the content of image and returns a string', async ()=>{
            // Arrange
            const image = 'sample.png';
            const expectedResult = CONTENT_OF_PROCESSED_IMAGE;
            const spy = jest.spyOn(imageProcessingLibrary, 'processImage');
    
            // Act + Assert
            const actualResult = async () => await imageProcessingLibrary.processImage(image);
            await expect(actualResult()).resolves.not.toThrow();
            expect(spy).toHaveBeenCalledTimes(1);
            await expect(actualResult()).resolves.toBe(expectedResult);
            expect(spy).toHaveBeenCalledWith(image);
        });
    });
});