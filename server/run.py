from .app import create_app  # ✅ Use relative import
import os

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5555))
    debug = os.getenv("FLASK_DEBUG", "True") == "True"
    app.run(host="0.0.0.0", port=port, debug=debug)
