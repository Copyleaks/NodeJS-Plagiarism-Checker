# Copyleaks NodeJs SDK

Copyleaks SDK enables you to scan text for plagiarism and detect content distribution online, using the Copyleaks plagiarism checker API.

Using Copyleaks SDK you can check for plagiarism in:
* Online content and webpages
* Local and cloud files (see [supported files](https://api.copyleaks.com/documentation/specifications#2-supported-file-types))
* Free text
* OCR (Optical Character Recognition) - scanning pictures with textual content (see [supported files](https://api.copyleaks.com/documentation/specifications#6-supported-image-types-ocr))

## Installation

Install using npm

```bash
npm i plagiarism-checker
```

## Register and Get Your API Key
To use the Copyleaks API you need to first be a registered user. The registration to Copyleaks takes a minute and is free of charge. [Signup](https://api.copyleaks.com/?register=true) and make sure to confirm your account.

As a signed user you can generate your personal API key. Do so on your [dashboard home](https://api.copyleaks.com/dashboard/:product) under 'API Access Credentials'.

For more information check out our [API guide](https://api.copyleaks.com/documentation/v3).

## Usage

#### Javascript
```js
const { Copyleaks } = require('plagiarism-checker');  
const copyleaks = new Copyleaks();
copyleaks.loginAsync(<your email>,<you api key>).then(res=> {...} , err=> {...});
```
#### Typescript
```ts
import { Copyleaks } from 'plagiarism-checker';  

export class MyClass{
    public copyleaks = new Copyleaks();
    public async getCopyleaksAuthTokenAsync(){
        try{
           return await this.copyleaks.loginAsync(<your email>,<you api key>); 
        }
        catch{
         ...   
        }
    }
}
```

## Demo
See [index.js](./demo/index.js) under demo folder for an example using javascript.
## Read More
* [API Homepage](https://api.copyleaks.com/)
* [API Documentation](https://api.copyleaks.com/documentation)
* [Plagiarism Report](https://github.com/Copyleaks/plagiarism-report)