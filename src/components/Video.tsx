import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../store";

export function Video() {
	const { currentLesson } = useCurrentLesson();
	const { isLoading, next } = useStore((state) => {
		return {
			isLoading: state.isLoading,
			next: state.next,
		};
	});

	function handlePlayNext() {
		next();
	}

	return (
		<div className="bg-zinc-950 w-full aspect-video">
			{isLoading && (
				<div className="flex h-full items-center justify-center">
					<Loader className="w-6 h-6 text-zinc-400 animate-spin" />
				</div>
			)}

			{!isLoading && (
				<ReactPlayer
					width="100%"
					height="100%"
					onEnded={handlePlayNext}
					controls
					url={`https://www.youtube.com/watch?v=${
						currentLesson && currentLesson.id
					}`}
				/>
			)}
		</div>
	);
}
