-- CreateIndex
CREATE INDEX "location_idx" ON "Location" USING GIST ("coordinates");
