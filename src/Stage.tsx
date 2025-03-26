import {ReactElement} from "react";
import {StageBase, StageResponse, InitialData, Message} from "@chub-ai/stages-ts";
import {LoadResponse} from "@chub-ai/stages-ts/dist/types/load";

type MessageStateType = any;
type ConfigType = any;
type InitStateType = any;
type ChatStateType = any;

export class Stage extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {

    constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) {
        super(data);
    }

    async load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>> {
        return {
            success: true,
            error: null,
            initState: null,
            chatState: null,
        };
    }

    async setState(state: MessageStateType): Promise<void> {
    }

    async beforePrompt(userMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
        const {content} = userMessage;
        const regex = /\[([^\]]+)\](?!\() /gm;
        const stageDirections = [...content.matchAll(regex)].map(match => match.slice(1)).join('\n').trim();
        const newContent = content.replace(regex, "").trim();

        return {
            stageDirections: stageDirections,
            messageState: null,
            modifiedMessage: newContent,
            systemMessage: null,
            error: null,
            chatState: null,
        };
    }

    async afterResponse(botMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
        return {
            stageDirections: null,
            messageState: null,
            modifiedMessage: null,
            error: null,
            systemMessage: null,
            chatState: null
        };
    }

    render(): ReactElement {
        return <></>
    }

}
