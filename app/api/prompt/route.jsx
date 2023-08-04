import Prompt from "@models/prompt";
import { connectToDataBase } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDataBase();
    const prompts = await Prompt.find().populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
