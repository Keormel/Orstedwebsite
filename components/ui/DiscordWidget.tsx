import { FaDiscord } from 'react-icons/fa'
import { Button } from './Button'

export function DiscordWidget() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-mc border-2 border-mc-border bg-stone p-4 shadow-pixel">
      <div className="font-retro text-2xl leading-none text-mc-text">Discord: 248 героев в таверне</div>
      <Button href="https://discord.gg/orsted" variant="ghost">
        <FaDiscord aria-hidden />
        Discord
      </Button>
    </div>
  )
}
