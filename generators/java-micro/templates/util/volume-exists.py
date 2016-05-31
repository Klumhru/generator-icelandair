#!/usr/bin/python

import sys
import json

def main():
	raw = ''.join(sys.stdin)
	vols = json.loads(raw)["Volumes"]
	exit(0 if len(vols) > 0 else 1)

if __name__=="__main__":
	main()