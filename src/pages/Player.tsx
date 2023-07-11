import { MessageCircle } from "lucide-react";
import { Module } from "../components/Module";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { useEffect } from "react";
import { useCurrentLesson, useStore } from "../store";

export function Player() {
	const course = useStore((state) => state.course);
	const load = useStore((state) => state.load);
	const { currentLesson } = useCurrentLesson();

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		if (currentLesson) {
			document.title = currentLesson.title;
		}
	}, [currentLesson]);

	return (
		<div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
			<div className="flex w-[1100px] flex-col gap-6">
				<div className="flex items-center justify-between">
					<Header />

					<button
						className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium
					hover:bg-violet-600 transition-colors"
					>
						<MessageCircle className="w-4 h-4" /> Deixar feedback
					</button>
				</div>

				<main
					className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900
				shadow pr-80"
				>
					<div className="flex-1">
						{" "}
						<Video />
					</div>

					<aside
						className="w-80 absolute top-0 bottom-0 right-0 overflow-y-scroll border-l
					border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950
					scrollbar-thumb-violet-500 divide-y-2 divide-zinc-900"
					>
						{course &&
							course.modules.map((module, index) => {
								return (
									<Module
										key={module.id}
										moduleIndex={index}
										title={module.title}
										lessonsAmount={module.lessons.length}
									/>
								);
							})}
					</aside>
				</main>
			</div>
		</div>
	);
}
