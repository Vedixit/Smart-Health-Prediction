from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data: list of diseases with symptoms and prevention/remedies
diseases_data = [
    {
        "name": "Common Cold",
        "symptoms": ["cough", "sore throat", "runny nose", "sneezing", "fever"],
        "prevention": "Wash hands regularly, avoid close contact with sick people.",
        "remedies": "Rest, drink fluids, use over-the-counter cold remedies."
    },
    {
        "name": "Influenza (Flu)",
        "symptoms": ["fever", "cough", "muscle aches", "fatigue", "headache"],
        "prevention": "Get flu vaccine annually, wash hands frequently.",
        "remedies": "Antiviral drugs, rest, fluids, and over-the-counter meds."
    },
    {
        "name": "Diabetes",
        "symptoms": ["increased thirst", "frequent urination", "fatigue", "blurred vision"],
        "prevention": "Maintain healthy weight, healthy diet, regular exercise.",
        "remedies": "Medication, insulin therapy, lifestyle changes."
    },
    {
        "name": "Hypertension",
        "symptoms": ["headache", "dizziness", "blurred vision", "chest pain", "none (silent)"],
        "prevention": "Reduce salt intake, exercise regularly, maintain healthy weight.",
        "remedies": "Medications, lifestyle modification."
    }
]
# ✅ Sample disease data
diseases_data = [
    {
        "name": "Flu",
        "symptoms": ["fever", "cough", "sore throat", "body ache"],
        "prevention": "Wash hands regularly, avoid close contact with sick people",
        "remedies": "Rest, hydration, over-the-counter medications"
    },
    {
        "name": "COVID-19",
        "symptoms": ["fever", "cough", "shortness of breath", "loss of taste"],
        "prevention": "Wear masks, maintain social distance, get vaccinated",
        "remedies": "Rest, fluids, seek medical attention if severe"
    },
    {
        "name": "Common Cold",
        "symptoms": ["sneezing", "runny nose", "sore throat"],
        "prevention": "Avoid cold exposure, maintain hygiene",
        "remedies": "Warm fluids, rest, steam inhalation"
    }
]

@app.route('/predict', methods=['POST'])
def predict():
    """
    Accept symptom data via JSON POST and return matching diseases with preventions/remedies.
    Expected JSON format: {"symptoms": "fever,cough"}
    """
    data = request.get_json()
    if not data or 'symptoms' not in data:
        return jsonify({"error": "Missing 'symptoms' in request body"}), 400

    symptoms_query = data['symptoms']
    input_symptoms = [sym.strip().lower() for sym in symptoms_query.split(',') if sym.strip()]

    if not input_symptoms:
        return jsonify({"error": "No valid symptoms provided"}), 400

    matched_diseases = []

    for disease in diseases_data:
        disease_symptoms = [sym.lower() for sym in disease["symptoms"]]
        if any(sym in disease_symptoms for sym in input_symptoms):
            matched_diseases.append(disease)

    if not matched_diseases:
        return jsonify({"message": "No diseases matched the provided symptoms."}), 200

    return jsonify(matched_diseases), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

