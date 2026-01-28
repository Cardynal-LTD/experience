// French widget translations (conversations only - system stays in English)
export default {
  chat: {
    billing: {
      c1: 'Pourquoi ai-je ete debite de 49€ deux fois ce mois-ci ?',
      a1: 'Laissez-moi verifier votre historique de facturation immediatement.',
      a2: "Vous avez raison — j'ai trouve un double debit. C'etait une erreur systeme de notre cote. Je lance le remboursement.",
      a3: "Remboursement effectue ! Vous verrez 49€ sur votre compte dans 2-3 jours. J'ai aussi signale cela pour eviter les doublons.",
      c2: "Super, merci d'avoir regle ca rapidement.",
      a4: 'Bien sur ! Desole pour la confusion. Autre chose ?'
    },
    order: {
      c1: 'Ou est ma commande #4521 ? Ca fait 5 jours.',
      a1: 'Laissez-moi verifier ca pour vous immediatement.',
      a2: "Je vois que votre commande est bloquee au centre de tri. C'est inhabituel — je transfere a notre equipe logistique.",
      note: 'Client frustre (5 jours). Commande #4521 bloquee au tri. Priorite + compensation.',
      h1: 'Bonjour Noa ! Je prends le relais. Je contacte le transporteur.',
      h2: "Bonne nouvelle — j'ai marque votre colis en priorite. Il arrivera demain avant 18h.",
      c2: 'Super, merci beaucoup !',
      h3: "Je vous en prie ! J'ai aussi ajoute 15% de remise sur votre prochaine commande pour le retard."
    },
    tech: {
      c1: "L'API renvoie une erreur 500 sur les requetes POST.",
      a1: 'Compris — laissez-moi verifier le statut du systeme.',
      a2: "Nos systemes fonctionnent normalement. L'erreur 500 peut etre due a un payload invalide. Pouvez-vous partager le body ?",
      c2: 'Voici : {"user": "test", "action": "create"}',
      a3: 'Trouve ! Il manque le champ obligatoire "api_key". Ajoutez-le et ca devrait marcher.',
      c3: 'Ca marche maintenant ! Merci beaucoup.',
      a4: "Parfait ! N'hesitez pas si vous avez besoin d'autre chose."
    }
  },
  playbook: {
    step1: 'Le client demande un remboursement',
    step2: 'Verification des regles',
    step3: 'Commande #12847 confirmee',
    step4: 'Reponse envoyee en 4.2s'
  },
  tree: {
    step1: '"Ma commande est en retard !"',
    step2trigger: 'Frustration elevee',
    branchLeftBlocked: 'Bloque',
    branchRight: 'Transfert vers Maya'
  },
  rag: {
    userQuestion: 'Quelle est la politique de remboursement ?',
    answer: "Les remboursements sont traites sous <strong>14 jours ouvrables</strong> apres reception de l'article retourne."
  }
};
