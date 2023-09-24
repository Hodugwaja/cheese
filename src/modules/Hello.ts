import { Extension, applicationCommand, listener } from '@pikokr/command.ts'
import { ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js'

class HelloExtension extends Extension {
  @listener({ event: 'ready' })
  async ready() {
    this.logger.info(`Logged in as ${this.client.user?.tag}`)
    await this.commandClient.fetchOwners()
  }

  @listener({ event: 'applicationCommandInvokeError', emitter: 'cts' })
  async errorHandler(err: Error) {
    this.logger.error(err)
  }

  @applicationCommand({
    name: '핑',
    type: ApplicationCommandType.ChatInput,
    description: '핑핑이',
  })
  async ping(i: ChatInputCommandInteraction) {
    await i.reply(`치즈 응답속도 : ${i.client.ws.ping}ms`)
  }

  @applicationCommand({
    name: '초대',
    type: ApplicationCommandType.ChatInput,
    description: '여러분도 초대해서 치혐을 해주세요',
  })
  async invite(i: ChatInputCommandInteraction) {
    await i.reply(`[치즈 초대하기](https://discord.com/api/oauth2/authorize?client_id=1155497023030706232&permissions=0&scope=applications.commands%20bot)`)
  }

  @applicationCommand({
    name: '치즈',
    type: ApplicationCommandType.ChatInput,
    description: '치즈 소환',
  })
  async cheese(i: ChatInputCommandInteraction) {
    const emoji = 'https://cdn.discordapp.com/emojis/1152282491743379476.webp?size=96&quality=lossless';
    if(emoji){
      await i.reply(`${emoji}`);
    }else{
      await i.reply(`치즈 포크하는게.... 어딨더라??`);
    }
  }
}

export const setup = async () => {
  return new HelloExtension()
}
