const LoadingModal = () => {
	return (
		<div className="abosolute inset-0 z-101 bg-white/50">
			<div className="flex w-full h-screen justify-center items-center">
				<svg
					className="animate-spin h-8 w-8 mr-3 ..."
					viewBox="0 0 24 24"
				></svg>
			</div>
		</div>
	);
};

export default LoadingModal;
