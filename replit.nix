{ pkgs }: {
	deps = [
        pkgs.joe
		pkgs.dotnet-sdk
        pkgs.nodejs-17_x
        pkgs.sqlite
	];
}