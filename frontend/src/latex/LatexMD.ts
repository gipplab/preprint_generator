export const latexMD = "# Using `annotations.sty` and `annotations.tex` in LaTeX\n" +
    "\n" +
    "## Overview\n" +
    "\n" +
    "This guide explains how to use the `annotations.sty` and `annotations.tex` files in your LaTeX document. The `annotations.sty` file provides custom styling and environments for annotations, while `annotations.tex` contains predefined annotation content.\n" +
    "\n" +
    "## Prerequisites\n" +
    "\n" +
    "Ensure that both `annotation.sty` and `annotation.tex` are in the same directory as your main LaTeX document.\n" +
    "\n" +
    "## Steps\n" +
    "\n" +
    "### 1. Using `annotation.sty`\n" +
    "\n" +
    "1. **Include the Style File:**  \n" +
    "   At the beginning of your LaTeX document, include the `annotations.sty` file by adding the following line in the preamble (before `\\begin{document}`):\n" +
    "\n" +
    "   ```latex\n" +
    "   \\usepackage{annotation}\n" +
    "   ```\n" +
    "\n" +
    "### 2. Adding the Annotations Section\n" +
    "\n" +
    "1. **Insert Annotations:**  \n" +
    "   To add the annotations section in your document, use `\\input` or `\\include` command to include `annotations.tex`. Typically, this is done at the end of your document.\n" +
    "\n" +
    "   ```latex\n" +
    "   % ... Your document content ...\n" +
    "\n" +
    "   \\input{annotation.tex}\n" +
    "   ```\n" +
    "\n" +
    "### 3. Adding the Annotations Button\n" +
    "\n" +
    "1. **Insert the Button:**  \n" +
    "   To add the \"Annotations\" button to the top right corner of the first page, ideally right after the `\\maketitle` command, you can use the `\\AddAnnotationRef` command.\n" +
    "\n" +
    "   First, ensure you have the `tikz` and `hyperref` packages in your preamble:\n" +
    "\n" +
    "   ```latex\n" +
    "   \\usepackage{tikz}\n" +
    "   \\usepackage{hyperref}\n" +
    "   ```\n" +
    "\n" +
    "   Use this command immediately after `\\maketitle`:\n" +
    "\n" +
    "   ```latex\n" +
    "   \\maketitle\n" +
    "   \\AddAnnotationRef\n" +
    "   ```"