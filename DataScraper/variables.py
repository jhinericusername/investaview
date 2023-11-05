import math

# PATHS
# src
scraper_script_path = "\\src\\scraper.py"
selectors_seeking_alpha_path = "\\src\\PageSelectors\\selectors-SeekingAlpha.yml"
selectors_seeking_alpha_article_path = "\\src\\PageSelectors\\selectors-SeekingAlphaArticle.yml"
requirements_path = "\\requirements.txt"

# data

articles_link_list_path = "\\data\\links\\article_link_list.json"
tech_article_content_path = "\\data\\tech_article_content.csv"
REIT_article_content_path = "\\data\\REIT_article_content.csv"

# Raw data scraped from Seeking Alpha
seeking_alpha_tech_content = '\\data\\tech_article_content.json'
seeking_alpha_REIT_content = '\\data\\REIT_article_content.json'

# urls
seeking_alpha_tech_url = "https://seekingalpha.com/stock-ideas/technology"
seeking_alpha_reit_url = "https://seekingalpha.com/dividends/reits"

# VARIABLES

# review scraping
articles_retrieve_count = 20

# RUNTIME FUNCTIONS

def get_scraper_script_path():
    return scraper_script_path

def get_selectors_seeking_alpha_path():
    return selectors_seeking_alpha_path

def get_seeking_alpha_tech_content():
    return seeking_alpha_tech_content

def get_seeking_alpha_REIT_content():
    return seeking_alpha_REIT_content

def get_requirements_path():
    return requirements_path

def get_articles_retrieve_count():
    return articles_retrieve_count

def get_seeking_alpha_tech_url():
    return seeking_alpha_tech_url

def get_seeking_alpha_reit_url():
    return seeking_alpha_reit_url

def get_articles_link_list_path():
    return articles_link_list_path

# YML Extractor files

def get_seeking_alpha_yml():
    return selectors_seeking_alpha_path

def get_seeking_alpha_article_yml():
    return selectors_seeking_alpha_article_path



