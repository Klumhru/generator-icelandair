#!/usr/bin/python

import sys
import json

def main():
	raw = ''.join(sys.stdin)
	snapshots = json.loads(raw)["Snapshots"]
	if len(snapshots) > 0:
		sys.stdout.write(snapshots[0]["SnapshotId"])
	else:
		exit(1)

if __name__=="__main__":
	main()