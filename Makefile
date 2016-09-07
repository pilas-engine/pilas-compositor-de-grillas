VERSION=$(shell travis/obtenerVersion.sh)
NOMBRE="pilas-compositor-de-grillas"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m
L=[01;30m

npm_config_loglevel="error"

comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}${NOMBRE}${N} - ${Y} versión ${VERSION}${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}            Instala todas las dependencias."
	@echo "    ${G}compilar${N}           Genera los archivos compilados."
	@echo "    ${G}test${N}               Prueba la aplicación."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version_patch${N}      Genera una versión (0.0.PATCH)."
	@echo "    ${G}version_minor${N}      Genera una versión (0.MINOR.0)."
	@echo "    ${G}version_major${N}      Genera una versión (MAJOR.0.0)."
	@echo "    ${G}binarios_electron${N}  Genera los binarios para electron."
	@echo ""
	@echo ""

iniciar:
	@echo "${G}instalando dependencias ...${N}"
	@npm install
	@bower install

compilar:
	ember build

test:
	@echo "${G}ejecutanto tests ...${N}"
	@ember test

version_patch:
	ember release

version_minor:
	ember release --minor

version_major:
	ember release --major

_preparar_electron:
	@echo "${G}Preparando directorio dist para funcionar con electron...${N}"
	@cp extras/electron.js dist
	@cp extras/package.json dist

binarios_electron: compilar _preparar_electron
	@echo "${G}Iniciando compilación de binarios...${N}"
	rm -rf binarios
	mkdir binarios
	make _binarios_osx
	make _binarios_linux

_binarios_osx:
	@echo "${G}Compilando para osx...${N}"
	rm -rf binarios/pilas-bloques-${VERSION}.dmg
	node_modules/.bin/electron-packager dist "${NOMBRE}" --app-version=${VERSION} --platform=darwin --arch=all --version=0.37.6 --ignore=node_modules --ignore=bower_components --out=binarios --overwrite --icon=extras/icono.icns
	hdiutil create binarios/${NOMBRE}-${VERSION}.dmg -srcfolder ./binarios/${NOMBRE}-darwin-x64/${NOMBRE}.app -size 200mb

_binarios_linux:
	@echo "${G}Compilando para Linux (32 y 64 bits)...${N}"
	node_modules/.bin/electron-packager dist "${NOMBRE}" --app-version=${VERSION} --platform=linux --arch=all --version=0.37.6 --ignore=node_modules --ignore=bower_components --out=binarios --overwrite
	cd binarios; zip -r ${NOMBRE}-${VERSION}-ia32.zip pilas-compositor-de-grillas-linux-ia32
	cd binarios; zip -r ${NOMBRE}-${VERSION}-x64.zip pilas-compositor-de-grillas-linux-x64
