const {model,models, Schema } = require("mongoose")



const PromptSchema = new Schema({
    creator :{
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        required: [true, 'prompt required'],
    },
    tag:{
        type: String,
        required: [true, 'tag required'],
    }

})

const Prompt = models.Prompt  || model("Prompt", PromptSchema)

export default Prompt;
