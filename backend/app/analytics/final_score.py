def final_score(technical: float, psychology: float) -> int:
    score = 0.7 * technical + 0.3 * psychology
    return int(max(min(score, 100), -100))