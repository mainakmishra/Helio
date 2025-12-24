/* eslint-disable no-template-curly-in-string */

export const registerLanguageCompletions = (monaco) => {
    if (!monaco) return;

    // Prevent duplicate registration if this function is called multiple times
    if (monaco.languages.getLanguages().some(l => l.id === 'cpp' && l._hasCustomCompletions)) return;

    // --- C++ Completions ---
    monaco.languages.registerCompletionItemProvider('cpp', {
        provideCompletionItems: (model, position) => {
            const suggestions = [
                {
                    label: 'cout',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'std::cout << ${1:value} << std::endl;',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Standard output stream'
                },
                {
                    label: 'cin',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'std::cin >> ${1:variable};',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Standard input stream'
                },
                {
                    label: 'vector',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'std::vector<${1:type}> ${2:name};',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'std::vector'
                },
                {
                    label: 'main',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'int main() {',
                        '\t${1:// code}',
                        '\treturn 0;',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Main function boilerplate'
                },
                {
                    label: 'include',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '#include <${1:iostream}>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Include directive'
                },
                {
                    label: 'for',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'for (int ${1:i} = 0; ${1:i} < ${2:count}; ++${1:i}) {',
                        '\t${3:/* code */}',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'For loop'
                }
            ];
            return { suggestions: suggestions };
        }
    });

    // --- Java Completions ---
    monaco.languages.registerCompletionItemProvider('java', {
        provideCompletionItems: (model, position) => {
            const suggestions = [
                {
                    label: 'sout',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'System.out.println(${1:message});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'System.out.println()'
                },
                {
                    label: 'psvm',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'public static void main(String[] args) {',
                        '\t${1:// code}',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Public Static Void Main'
                },
                {
                    label: 'main', // Alternative trigger for psvm
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'public static void main(String[] args) {',
                        '\t${1:// code}',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Public Static Void Main'
                },
                {
                    label: 'class',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'public class ${1:ClassName} {',
                        '\t${2:// code}',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Class definition'
                },
                {
                    label: 'for',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'for (int ${1:i} = 0; ${1:i} < ${2:limit}; ${1:i}++) {',
                        '\t${3:// code}',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'For loop'
                }
            ];
            return { suggestions: suggestions };
        }
    });
};
