import { SERVER } from "@/lib/constants";
import { Card } from "@/components/ui/card";

export function DiscordEmbed() {
  return (
    <Card title="Discord сообщества" description="Новости, пати, поддержка и набор в гильдии.">
      <iframe
        src={SERVER.discordWidget}
        title="Discord widget"
        width="100%"
        height="320"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="rounded-lg border border-[#2a3d5a] bg-[#0d1729]"
      />
    </Card>
  );
}
