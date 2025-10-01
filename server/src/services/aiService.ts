export async function process(nodeData: any, inputData: any) {
  console.log(`[AI Service] Received prompt: "${nodeData.prompt}"`);
  const response = `This is a simulated AI response to the prompt: '${nodeData.prompt}'`;
  return response;
}
