from flask import Flask, render_template, request, jsonify
from ChatSql import ChatWithSql

app = Flask(__name__)

# Initialize the ChatWithSql instance
api_key = "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"
chat_sql = ChatWithSql("newuser", "newpassword", "localhost", "example_db", api_key)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    user_message = request.json.get("message")
    bot_response = chat_sql.message(user_message)
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change the port number here if needed
