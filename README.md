# Enhanced Preprint Generator

### [Try it yourself!](https://preprint.larskaesberg.de/)

The Enhanced Preprint Generator is a powerful tool that allows users to generate preprints with suggested related papers and add a BibTeX annotation to the PDF.

## Prerequisites

To use the Enhanced Preprint Generator, you must have Node version 16.13.0 or higher installed on your machine.

## Getting Started

To get started, simply clone this repository and follow the instructions in the frontend and backend READMEs:

 - [Frontend README](frontend/README.md)
 - [Backend README](backend/README.md)

## Features

The Enhanced Preprint Generator offers the following features:

 - Generate preprints with related papers: The tool utilizes powerful algorithms to suggest related papers to include in your preprint, helping you to create more comprehensive and impactful research.
 - Add a BibTeX annotation to the PDF: The tool also generates a BibTeX annotation, which can be used to easily cite your preprint in other works.

## Contributing

We welcome contributions to the Enhanced Preprint Generator! If you encounter a bug, have a feature request, or would like to contribute code, please open an issue or pull request on this repository.

## License 

This project is licensed under the MIT License. Please refer to the [LICENSE](COPYING) file for more information.

## Demo
Website: [https://preprint.larskaesberg.de](https://preprint.larskaesberg.de)
### Hompage
![EPG-Demo1.png](pictures%2FEPG-Demo1.png)

-----
### Metadata Form
![EPG-Demo3.png](pictures%2FEPG-Demo3.png)

-----
### BibTex annotation
![EPG-Demo4.png](pictures%2FEPG-Demo4.png)

## Useful resources

 - [Edit PDFs](https://pdf-lib.js.org/)
 - [Express](https://expressjs.com/de/)

## TODO

- [ ] use [compromise](https://www.npmjs.com/package/compromise) for nlp keyword detection
- [ ] website for each preprint in backend (pdf, annotation, related papers)
