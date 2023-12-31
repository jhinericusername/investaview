# api, scraper, data imports
from flask import Flask, request, jsonify, session
import selectorlib
import requests
import os
from dateutil import parser as dateparser
import json
from requests_html import HTMLSession
import csv
import argparse

# system
import sys, subprocess
# adding cwd to the system path to access variables
sys.path.insert(0, os.getcwd())
import variables

# Flask and Extractor variables

# Scrape product review page for information
def scrape_article_page(url, extractor_path):

    extractor = selectorlib.Extractor.from_yaml_file(extractor_path)  
    headers = {
        'authority': 'seekingalpha.com',
    }

    # Download the page using requests
    print("Downloading %s"%url)
    r = requests.get(url, headers=headers)
    html_content = r.text
    # Simple check to check if page was blocked (Usually 503)
    if r.status_code != 200:
        print("URL request failed with code: " + str(r.status_code))
        return None


    # Pass the HTML of the page and create 
    data = extractor.extract(html_content,base_url=url)
    return data


def extract_article_links(article_link_list_path, link_batch_generate_path):
    with open(article_link_list_path, 'r') as file:
        article_link_list_json = json.load(file)

    print(article_link_list_json)
    
    article_link_list = []

    for article_link in article_link_list_json['Articles']['Article_Box']:
        print(article_link['Article_Link'])
        article_link_list.append(article_link['Article_Link'])
    
    index = 0
    count = 0
    upper_bound = 20
    list_to_json = []
    while index < len(article_link_list):
        list_to_json.append({'Article_Link': article_link_list[index]})
        if len(list_to_json) >= upper_bound:
            count += 1
            with open(os.getcwd() + link_batch_generate_path + str(count) + ".json", "w") as outfile:
                json.dump(list_to_json, outfile)
            list_to_json = []
        index += 1

def scrape_articles(csv_file_path, link_batch_generate_path, start=1, end=240, creating=False):

    if creating==True:
        data_to_save = [['Title', 'Ticker_Covered', 'Author', 'Author_Link', 'Summary', 'Full_Article_Text', 'Date_Of_Publication']]
        write_mode = 'w'
    else:
        data_to_save = []
        write_mode = 'a'
    for i in range(start, end):
        print("reading articles from list: " + str(i))
        json_file_name = os.getcwd() + link_batch_generate_path + str(i) + ".json"
        with open(json_file_name, 'r') as file:
            links_json = json.load(file)
        print(links_json)
        for article_pair in links_json:
            article_link = article_pair['Article_Link']
            article_data = scrape_article_page(article_link, os.getcwd() + variables.get_seeking_alpha_article_yml())
            print(article_data)
            if article_data['Ticker_Covered'] is not None and len(article_data['Ticker_Covered']) > 0: 
                new_row = [article_data['Title'], article_data['Ticker_Covered'], article_data['Author'], article_data['Author_Link'], article_data['Summary'], article_data['Full_Article_Text'], article_data['Date_Of_Publication']]
                data_to_save.append(new_row)


    with open(csv_file_path, write_mode, newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        for row in data_to_save:
            print(row)
            writer.writerow(row)
            
def parse_lofty_marketplace_json():
    json_file_path = os.getcwd() + "\\data\\misc\\lofty_marketplace_content.json"

    content = [['Full Address', 'Projected Rental Yield (%)', 'Projected Annual Return (%)', 'Share Price ($)']]

    # Open the JSON file for reading
    with open(json_file_path, 'r') as file:
        # Load the JSON data from the file
        data = json.load(file)
    
    print(data)

    for house_list in data['Housing_Lists_Box']['Housing_List']:
        for house in house_list['Housing_List']:
            if house['House']['Address'] and house['House']['City_State_Zip'] and house['House']['Projected_Rental_Yield'] and house['House']['Projected_Annual_Return'] and house['Price_Share']:
                address = house['House']['Address'] + " " + house['House']['City_State_Zip']
                projected_rental_yield = house['House']['Projected_Rental_Yield'].split("%")[0]
                projected_annual_return = house['House']['Projected_Annual_Return'].split("%")[0]
                share_price = ((house['Price_Share'].split("$")[1]).split("+")[0])
                share_price = share_price.replace(",", "")
                content.append([address, projected_rental_yield, projected_annual_return, share_price])
    
    print(content)

    csv_file_path = os.getcwd() + variables.get_lofty_marketplace_content_path()

    # Open the CSV file for writing
    with open(csv_file_path, 'w', newline='') as file:
        # Create a CSV writer object
        csv_writer = csv.writer(file)

        # Write the array to the CSV file
        for row in content:
            csv_writer.writerow(row)


def main():
    parser = argparse.ArgumentParser(description='args for scraper script')
    parser.add_argument('--start', required=False,
                        help='which set of links to start at')
    parser.add_argument('--end', required=False,
                        help='which set of links to end at')
    args = parser.parse_args()

    parse_lofty_marketplace_json()

    if args.start is None or args.end is None:
        print()
        print("No start or end article link data sets specified, so program will exit early without processing links.")
        exit(0)

    seeking_alpha_tech_url = variables.get_seeking_alpha_tech_url()
    seeking_alpha_reit_url = variables.get_seeking_alpha_reit_url()

    # Edit for article link scraping and content scraping
    link_batch_generate_path = "\\data\\links\\link_list_"
    csv_file_path = os.getcwd() + variables.get_REIT_article_content_path()
    article_link_list_path = os.getcwd() + variables.get_articles_link_list_path()
    start = int(args.start)
    end = int(args.end)

    # extract_article_links(article_link_list_path, link_batch_generate_path)

    scrape_articles(csv_file_path, link_batch_generate_path, start, end, creating=False)

    exit(0)

if __name__ == "__main__":
    main()
