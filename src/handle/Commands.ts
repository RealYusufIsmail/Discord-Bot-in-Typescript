import {Command} from "./Command";
import {Info} from "../commands/info";
import {Ping} from "../commands/Ping";
import {Ban} from "../commands/moderation/Ban";
import {UnBan} from "../commands/moderation/UnBan";
import {UserInfo} from "../commands/UserInfo";

export const Commands: Command[] = [Ping, Info, Ban, UnBan, UserInfo];
