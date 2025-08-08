export function validityCPF(cpf: string): boolean {
    // Verifica o padrão de formatação ###.###.###-##
    const formatRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!formatRegex.test(cpf)) return false;

    // Remove a pontuação
    const cleanedCPF = cpf.replace(/[^\d]+/g, '');

    // Verifica se tem 11 dígitos e se todos os dígitos não são iguais
    if (cleanedCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanedCPF)) return false;

    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }

    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cleanedCPF.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }

    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;

    return rev === parseInt(cleanedCPF.charAt(10));
}
