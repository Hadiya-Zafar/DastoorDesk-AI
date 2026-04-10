import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

# Disable telemetry if needed to speed up or avoid warnings
os.environ["ANONYMIZED_TELEMETRY"] = "False"

print("Loading embeddings...")
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

print("Loading vector DB...")
vector_db = Chroma(persist_directory="./dastoor_db", embedding_function=embeddings)

query = "someone hacked my social media account what should i do"
category = "cybercrime"

print(f"\nQuerying: '{query}' in category: '{category}'")

# Test 1: Category filtered search with scores
print("\n--- Test 1: Filtered Search ---")
try:
    results1 = vector_db.similarity_search_with_relevance_scores(query, k=8, filter={"category": category})
    for i, (doc, score) in enumerate(results1):
        print(f"\nResult {i+1} (Score: {score:.4f}):")
        print(f"Source: {doc.metadata.get('source')}, Raw Category: {doc.metadata.get('raw_category')}, Mapped Category: {doc.metadata.get('category')}")
        print(f"Content:\n{doc.page_content[:200]}...")
except Exception as e:
    print(f"Test 1 failed: {e}")

# Test 2: Unfiltered search with scores
print("\n--- Test 2: Unfiltered Search ---")
try:
    results2 = vector_db.similarity_search_with_relevance_scores(query, k=8)
    for i, (doc, score) in enumerate(results2):
        print(f"\nResult {i+1} (Score: {score:.4f}):")
        print(f"Source: {doc.metadata.get('source')}, Raw Category: {doc.metadata.get('raw_category')}, Mapped Category: {doc.metadata.get('category')}")
except Exception as e:
    print(f"Test 2 failed: {e}")

# Test 3: Plain similarity search without scores
print("\n--- Test 3: Plain Search ---")
try:
    results3 = vector_db.similarity_search(query, k=5, filter={"category": category})
    for i, doc in enumerate(results3):
        print(f"\nResult {i+1}:")
        print(f"Source: {doc.metadata.get('source')}, Raw Category: {doc.metadata.get('raw_category')}, Mapped Category: {doc.metadata.get('category')}")
        print(f"Content:\n{doc.page_content[:200]}...")
except Exception as e:
    print(f"Test 3 failed: {e}")

