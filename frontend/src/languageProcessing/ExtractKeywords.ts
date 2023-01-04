const STOP_WORDS = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'i', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with'];

export function extractKeywords(text: string, numKeywords: number): string[] {
    // Tokenize the text
    const tokens = text.toLowerCase().split(/\b/);

    // Remove stop words and punctuation
    const terms = tokens.filter((token) => !STOP_WORDS.includes(token) && !/\d/.test(token) && /\w/.test(token));

    // Calculate the term frequency for each term
    const termFrequency: { [id: string]: number } = terms.reduce((counts: { [id: string]: number }, term) => {
        counts[term] = (counts[term] || 0) + 1;
        return counts;
    }, {});

    // Sort the terms by their term frequency in descending order
    const sortedTerms = Object.entries(termFrequency)
        .sort((a, b) => b[1] - a[1])
        .map((pair) => pair[0]);

    // Return the top `numKeywords` terms
    return sortedTerms.slice(0, numKeywords);
}
