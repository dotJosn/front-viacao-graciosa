import fs from 'fs';
import path from 'path';

// Caminho absoluto para o arquivo JSON de passagens adquiridas
const purchasedTicketsPath = path.join(process.cwd(), 'src', 'data', 'purchasedTickets.json');

// Função para lidar com a requisição POST (compra de passagem)
export async function POST(req) {
  try {
    // Pega os dados do corpo da requisição
    const { ticket, customerName, seatNumber } = await req.json();
    console.log('Dados recebidos:', ticket, customerName, seatNumber);  // Log para verificar os dados

    // Verifica se os dados estão completos
    if (!ticket || !customerName || !seatNumber) {
      console.error('Dados incompletos', { ticket, customerName, seatNumber });
      return new Response(
        JSON.stringify({ message: 'Dados incompletos. Não foi possível processar a compra.' }),
        { status: 400 }
      );
    }

    // Lê o arquivo JSON existente
    const existingTickets = JSON.parse(fs.readFileSync(purchasedTicketsPath, 'utf8'));
    console.log('Tickets existentes:', existingTickets); // Log para verificar os dados existentes

    // Cria um novo objeto para a compra, incluindo o número do assento
    const newPurchase = {
      ...ticket,
      customerName,
      seatNumber, // Incluindo o número do assento
      purchaseDate: new Date().toISOString(), // Adiciona a data da compra
    };

    // Adiciona a nova compra à lista de passagens adquiridas
    existingTickets.push(newPurchase);

    // Grava o novo array de passagens adquiridas de volta no arquivo
    fs.writeFileSync(purchasedTicketsPath, JSON.stringify(existingTickets, null, 2));

    console.log('Compra salva com sucesso:', newPurchase); // Log para confirmar a compra salva

    // Retorna uma resposta de sucesso
    return new Response(
      JSON.stringify({ message: 'Compra confirmada!', ticket: newPurchase }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao salvar a compra:', error);  // Log de erro
    return new Response(
      JSON.stringify({ message: 'Erro ao salvar a compra.' }),
      { status: 500 }
    );
  }
}
