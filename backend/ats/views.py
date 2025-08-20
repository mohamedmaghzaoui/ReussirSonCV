import os
import json
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
HEADERS = {"Content-Type": "application/json"}
# prepare json
def clean_and_parse_json(raw_text):
    cleaned = raw_text.strip("```json\n").strip("```")
    return json.loads(cleaned)


def call_gemini(prompt):
    body = {"contents": [{"parts": [{"text": prompt}]}]}
    params = {"key": GEMINI_API_KEY}

    response = requests.post(GEMINI_URL, headers=HEADERS, params=params, json=body)
    if response.status_code != 200:
        return None, response.json()

    try:
        text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        return text, None
    except (KeyError, IndexError):
        return None, {"error": "Réponse inattendue de Gemini"}

# ai analyse post endpoint
@api_view(['POST'])
def analyse_cv(request):
    cv_data = request.data.get("cv")
    if not cv_data:
        return JsonResponse({"error": "CV requis"}, status=400)

    prompt = f"""
    Tu es un expert RH spécialisé dans l'évaluation stricte et objective des CV,
    avec plus de 20 ans d'expérience dans le recrutement international.

    Analyse le CV suivant avec une approche très exigeante (harsh critique) :
    - Note sévèrement, comme si tu devais sélectionner seulement les 5% meilleurs candidats.
    - Prends en compte uniquement des critères professionnels concrets et mesurables.
    - Si une section est absente ou insuffisante, pénalise fortement.
    - Ne sois pas indulgent : un CV moyen doit obtenir une note < 50.
    - Justifie chaque faiblesse avec des points précis.

    Voici le CV à analyser :
    {cv_data}

    Le JSON doit être strictement au format suivant, sans texte avant ou après, sans explications hors des champs.
    Pas de balises, pas de phrases introductives, uniquement du JSON valide.

    {{
    "score_global": "Nombre entre 0 et 100 calculé selon ces critères (pondération) :
        30% Pertinence et clarté des expériences professionnelles,
        20% Adéquation des compétences avec un profil professionnel exigeant,
        15% Qualité de la rédaction (orthographe, grammaire, clarté),
        15% Structure et lisibilité du CV,
        10% Présence et qualité des sections obligatoires (contact, compétences, éducation, résumé professionnel, expériences, formatage, longueur),
        10% Impact et professionnalisme général",
    "niveau": "Faible | Moyen | Fort",
    "resume": "Résumé synthétique, objectif et professionnel de la qualité globale du CV",
    "points_forts": ["Liste précise des atouts majeurs du CV"],
    "points_faibles": ["Liste précise des faiblesses majeures, même si elles sont nombreuses"],
    "suggestions": ["Recommandations concrètes et applicables pour améliorer le CV"],
    "orthographe_et_grammaire": ["Liste des fautes ou remarques sur la langue, avec exemples si possible"],
    "sections": {{
        "informations_de_contact": "OK ou Amélioration nécessaire",
        "competences": "OK ou Amélioration nécessaire",
        "education": "OK ou Amélioration nécessaire",
        "resume_professionnel": "OK ou Amélioration nécessaire",
        "experience_professionnelle": "OK ou Amélioration nécessaire",
        "formatage": "OK ou Amélioration nécessaire",
        "longueur": "OK ou Amélioration nécessaire"
    }}
    }}
    """



    result, error = call_gemini(prompt)
    if error:
        return JsonResponse(error, status=500)

    try:
     analysis_data = clean_and_parse_json(result)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Erreur lors de l'analyse du JSON retourné"}, status=500)

    return JsonResponse({"analysis": analysis_data})
