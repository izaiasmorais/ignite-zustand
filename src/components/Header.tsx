import { useStore, useCurrentLesson } from "../store";

export function Header() {
	const isLoading = useStore((state) => state.isLoading);

	const { currentLesson, currentModule } = useCurrentLesson();

	if (isLoading) {
		return <h1 className="text-2xl font-bold">Carregando...</h1>;
	}

	return (
		<div className="flex flex-col gap-1">
			<h1 className="text-2xl font-bold">
				{currentLesson && currentLesson.title}
			</h1>
			<span className="text-sm text-zinc-400">
				Módulo "{currentModule && currentModule.title}"
			</span>
		</div>
	);
}
