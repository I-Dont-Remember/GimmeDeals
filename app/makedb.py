import models
import config
import views
import configparser

def main():
    db = models.db
    Day = models.Day

    parser = configparser.ConfigParser()
    found = parser.read(config.DEALS_FILE)

    if not found:
        print('Deals file <%s> could not be read properly' % config.DEALS_FILE)
        return

    db.create_all()

    # For each day of the week
    for day_section in parser.sections():
        db.session.add(Day(day_section))
        db.session.commit()

        valid_deals = []
        config_deals = parser.get(day_section, 'list').split('\n')
        # Drop empty first element
        config_deals.pop(0)
        print(day_section)
        for deal in config_deals:
            print('      %s' %deal)
            dsplit = deal.split('*')
            deal_dict = {
                'location': dsplit[0],
                'deal': dsplit[1]
            }
            valid_deals.append(deal_dict)

        for deal in valid_deals:
            views.add_validated_deal(day_section,
                                deal['location'], deal['deal'])
        db.session.commit()

if __name__ == '__main__':
    main()
