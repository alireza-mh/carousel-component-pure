const extensionValidation = (filePath:string, ext:string = 'jpg') => {
    const filePathArray: string[] = filePath.split('.');
    if(filePathArray.length === 0){
        return false;
    }
    return filePathArray[filePathArray.length - 1].match(ext);
}
export default extensionValidation;