from app import create_app, db
from app.models import Restaurant

def seed_restaurants():
    app = create_app()
    with app.app_context():
        db.create_all()
        db.session.commit()

        restaurants = [
            {
                "name": "Pizza Palace",
                "address": "123 Main St, Anytown, Kenya",
                "rating": 4.5,
                "cuisine": "Italian",
            },
            {
                "name": "Burger Barn",
                "address": "456 Elm, OTC, Kenya",
                "rating": 4.2,
                "cuisine": "American",
            },
            {
                "name": "Sushi Spot",
                "address": "789 Pine, Nairobi, Kenya",
                "rating": 4.7,
                "cuisine": "Japanese",
            },
            {
                "name": "Pasta Paradise",
                "address": "101 Oak, Nairobi, Kenya",
                "rating": 4.3,
                "cuisine": "Italian",
            },
            {
                "name": "Taco Town",
                "address": "222 Maple, Nairobi, Kenya",
                "rating": 4.6,
                "cuisine": "Mexican",
            },
            {
                "name": "Thai Taste",
                "address": "333 Birch, Nairobi, Kenya",
                "rating": 4.4,
                "cuisine": "Thai",
            },
        ]

        for restaurant in restaurants:
            new_restaurant = Restaurant(**restaurant) # Unpacking the dictionary
            db.session.add(new_restaurant)
        db.session.commit()
        print("Database seeded successfully")

if __name__ == "__main__":
    seed_restaurants()

