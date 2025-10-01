export async function process(nodeData: any, inputData: any) {
  console.log(`[Email Service] Simulating sending email:`);
  console.log(`   To: ${nodeData.to}`);
  console.log(`   Subject: ${nodeData.subject}`);
  console.log(`   Body: ${inputData}`);
  return { status: "Email sent successfully" };
}
