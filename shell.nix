with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "clear-tearms-dev";
    buildInputs = [
        nodejs
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
