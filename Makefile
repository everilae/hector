SRC_DIR = src
COMP_DIR = $(SRC_DIR)/components
SCENE_DIR = $(SRC_DIR)/scenes

hector.js: $(SRC_DIR)/globals.js $(SRC_DIR)/cursor.js $(SCENE_DIR)/*.js $(COMP_DIR)/*.js $(SRC_DIR)/init.js
	echo '(function () {\n"use strict";\n' > $@
	cat $+ >> $@
	echo '\n}());' >> $@

all: hector.js

clean:
	rm -f hector.js

.PHONY: all clean
