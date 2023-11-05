import math

# PATHS
# src
scraper_script_path = "\\src\\scraper.py"
selectors_seeking_alpha_path = "\\src\\PageSelectors\\selectors-SeekingAlpha.yml"
selectors_seeking_alpha_article_path = "\\src\\PageSelectors\\selectors-SeekingAlphaArticle.yml"
selectors_lofty_marketplace_path = "\\src\\PageSelectors\\selectors-LoftyMarketplace.yml"
requirements_path = "\\requirements.txt"

# data

# Article links
articles_link_list_path = "\\data\\links\\article_link_list.json"

# Raw data scraped from Seeking Alpha
tech_article_content_path = "\\data\\tech_article_content.csv"
REIT_article_content_path = "\\data\\REIT_article_content.csv"
lofty_marketplace_content_path = "\\data\\lofty_marketplace_content.csv"


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

def get_tech_article_content_path():
    return tech_article_content_path

def get_REIT_article_content_path():
    return REIT_article_content_path

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

def get_lofty_marketplace_content_path():
    return  lofty_marketplace_content_path

# YML Extractor files

def get_seeking_alpha_yml():
    return selectors_seeking_alpha_path

def get_seeking_alpha_article_yml():
    return selectors_seeking_alpha_article_path



