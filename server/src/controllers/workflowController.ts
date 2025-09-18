import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveWorkflow = async (req: Request, res: Response) => {
  try {
    const { name, nodes, edges, userId } = req.body;

    // Validate required fields
    if (!name || !nodes || !edges || !userId) {
      return res.status(400).json({
        message: "Missing required fields: name, nodes, edges, userId",
      });
    }

    const workflowData = { name, nodes, edges, userId };
    const createdWorkflow = await prisma.workflow.create({
      data: workflowData,
    });
    return res
      .status(201)
      .json({ message: "Workflow saved", data: createdWorkflow });
  } catch (error) {
    return res.status(500).json({ message: "Error saving workflow", error });
  }
};

export const getWorkflowById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Destructuring is a bit cleaner
    const workflow = await prisma.workflow.findUnique({
      where: { id: id },
    });

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    return res.status(200).json({ message: "Workflow found", data: workflow });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving workflow", error });
  }
};

export const executeWorkflow = (req: Request, res: Response) => {
  try {
    const extracted_id = req.params.id;
    return res
      .status(200)
      .json({ message: `Executing workflow ${extracted_id}` });
  } catch (error) {
    return res.status(500).json({ message: "Error executing workflow", error });
  }
};
