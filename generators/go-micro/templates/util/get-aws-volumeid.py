#!/usr/bin/python

import sys;
import json;

def main():
	raw = ''.join(sys.stdin)
	data = json.loads(raw)
	volid = data.get('VolumeId')
	sys.stdout.write(volid)

if __name__=="__main__":
	main()