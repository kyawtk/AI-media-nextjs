import Prompt from "@models/prompt";
import { connectToDataBase } from "@utils/database";
import User from "@models/user";
export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectToDataBase();
    
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};
