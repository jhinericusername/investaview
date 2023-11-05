import json
import os
import argparse

# system
import sys, subprocess
# adding cwd to the system path to access variables
sys.path.insert(0, os.getcwd())
import variables


# Launches API script
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='launch script')
    parser.add_argument('--start', required=False,
                        help='which set of links to start at')
    parser.add_argument('--end', required=False,
                        help='which set of links to end at')
    args = parser.parse_args()


    
    if args.start and args.end:
        if not args.start.isnumeric():
            print("Start is not an integer value.")
            exit(1)
        if not args.end.isnumeric():
            print("End is not an integer value.")
            exit(1)
        subprocess.call([sys.executable, os.getcwd() + variables.get_scraper_script_path(), '--start', args.start, '--end', args.end])
    else:
        subprocess.call([sys.executable, os.getcwd() + variables.get_scraper_script_path()])

