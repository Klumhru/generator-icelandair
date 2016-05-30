#!/usr/bin/python

import sys
import json

def main():
	raw = ''.join(sys.stdin)
	volumes = json.loads(raw)["Volumes"]
	if len(volumes) > 0:
		sys.stdout.write(volumes[0]["VolumeId"])
	else:
		exit(1)

if __name__=="__main__":
	main()