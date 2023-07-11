import ReactPlayer from "react-player";
import { next, userCurrentLesson } from "../store/slicers/player";
import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";

export function Video() {
	const dispatch = useAppDispatch();

	const { currentLesson } = userCurrentLesson();

	const isCourseLoading = useAppSelector((state) => state.player.isLoading);

	function handlePlayNext() {
		dispatch(next());
	}

	return (
		<div className="bg-zinc-950 w-full aspect-video">
			{isCourseLoading && (
				<div className="flex h-full items-center justify-center">
					<Loader className="w-6 h-6 text-zinc-400 animate-spin" />
				</div>
			)}

			{!isCourseLoading && (
				<ReactPlayer
					width="100%"
					height="100%"
					onEnded={handlePlayNext}
					// playing
					controls
					url={`https://www.youtube.com/watch?v=${
						currentLesson && currentLesson.id
					}`}
				/>
			)}
		</div>
	);
}
