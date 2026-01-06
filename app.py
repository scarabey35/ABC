from flask import Flask, render_template, request, redirect, url_for
from werkzeug.security import generate_password_hash
from models import db, User
import os

app = Flask(__name__)

# === SQLite config ===
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "dev-secret"

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def landing():
    return render_template("landing.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")

        if not username or not email or not password:
            return "Invalid data", 400

        if User.query.filter(
            (User.username == username) |
            (User.email == email)
        ).first():
            return "User already exists", 409

        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )

        db.session.add(user)
        db.session.commit()

        return redirect(url_for("landing"))

    return render_template("register.html")


@app.route("/login")
def login():
    return render_template("login.html")


if __name__ == "__main__":
    app.run(debug=True)
