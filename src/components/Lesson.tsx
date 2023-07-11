import { PlayCircle, Video } from "lucide-react";

interface LessonProps {
	title: string;
	duration: string;
	isCurrent?: boolean;
	onPlay(): { payload: any; type: "player/play" };
}

export function Lesson({
	duration,
	title,
	onPlay,
	isCurrent = false,
}: LessonProps) {
	return (
		<button
			onClick={onPlay}
			data-active={isCurrent}
			disabled={isCurrent}
			className={`flex items-center gap-3 text-sm enabled:hover:text-zinc-300
		transition-colors text-zinc-400 data-[active=true]:text-emerald-400`}
		>
			{!isCurrent && <Video className="w-4 h-4 text-zinc-500" />}
			{isCurrent && <PlayCircle className="w-4 h-4 text-emerald-400" />}

			<span>{title}</span>
			<span className="ml-auto font-mono text-sx text-zinc-500">
				{duration}
			</span>
		</button>
	);
}
