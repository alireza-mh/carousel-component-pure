const extensionValidation = (filePath:string, allowedExtensions:string[] = ['jpg']) => {
    const filePathArray: string[] = filePath.split('.');
    if(filePathArray.length < 1 || filePathArray[0] === ''){
        return false;
    }
    return allowedExtensions.some(extension => RegExp(`^${extension}$`,'gi').test(filePathArray[filePathArray.length - 1]));
}
export default extensionValidation;